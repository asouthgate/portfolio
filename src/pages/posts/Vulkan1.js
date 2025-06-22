import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { Link } from 'react-router-dom';

export const metadata = {
  title: "Blog1 Foo",
  date: "June 8, 2025"
};

export default function Vulkan1() {
  return (
    <div>
      <h1> Vulkan and the GPU as a mini compute cluster </h1>
      <h2> <i> Updated 2025-06-21 </i> </h2>
      <h3> GPU frameworks </h3>
      <p>

      In a previous <Link to="/smoothed-particle-hydrodynamics">post</Link>, I talked about fluid simulation and realistic flows. In order to simulate a large enough number of particles for something interesting, moving beyond a single CPU is required. One way to do this is to employ GPU programming. Now, there are multiple GPU compute "platforms" like CUDA. I don't have a Nvidia GPU, so can't use this. There is an alternative for my GPU, ROCm, but I previously found it to be a pain in terms of maintainence and support across platforms. There is also OpenCL, but there are similar problems there. So am I out of luck? <br/><br/>

    Vulkan is a cross-platform graphics & compute library that was developed to replace OpenGL. There is a common misconception that Vulkan is only for graphics. This is not true, and compute is also possible. Vulkan, whilst serving as a replacement for OpenGL, is more complex. This is considered an advantage, since OpenGL's abstractions were widely criticised. Fine-grained control can be necessary for achieving advanced performance objectives. People do not tend to use it for simple compute programming since, because of this complexity, hundreds of lines of code are required to simply square an array of numbers. This is quite advanced programming, but for a curious engineer it's a good challenge. <br/><br/>

    CUDA et al. are abstractions over the complexities of GPU programming, specifically for compute, to allow people who don't know much about GPUs to use them quickly with minimal code. At this point, CUDA is very powerful. However, it is not cross-platform. <br/><br/>

    At this point, I was going to ask: am I stuck without a Nvidia GPU? I have pretty much answered this already. No, a few hundred lines of setup is not scary or prohibitive, but instead an opportunity to learn about GPUs. In addition, I am curious about the development of a lightweight wrapper over this to allow cross-platform GPU compute for common scientific tasks. In many cases, this can be as simple as running a function of one variable over an entire array of values. So creating our own abstraction over this could be fun. In doing this, my aim will be a very simple layer, abstracting only boilerplate for a common scientific compute setup, and offering some reusable shader code. The aim will be consistency with Vulkan's design philosophy, and still require users to understand the GPU, write shader code, and so on.
      </p>

      <h3> Looking at the GPU like a compute cluster </h3>

      <p>
        
        I always get the feeling, when doing GPU programming, that I have a mini super-computer inside my computer. This analogy is motivated by a) a feeling about the potential for parallelism and b) layers in between my host-side script and where the work gets done. The GPU cores seem 'far away'. <br/><br/>

        Accurate information on this section can be found at the Vulkan docs [1]. This is quite complex, which as usual I will avoid & use an analogy instead. If you're used to using a supercomputing cluster, and submitting jobs via Slurm, you are probably familiar with configuration when trying to do something reasonably complex. GPU programming in some ways is similar. We request physical & logical devices (like requesting compute nodes), queues (ok, nominally similar), manage buffers (a bit like managing local node memory, shared memory, etc.), send over special shader programs (like the software we launch on each node), and manage synchronization. In this comparison, our submission bash scripts are a bit like the C++ code we use to submit GPU requests. It's helpful to think of it as an abstract, external, specialised compute service. Don't take the analogy too literally, the technical details are different. That said, here are the basic steps required for squaring an array in C++. <br/><br/>

        We have to choose a target device. We enumerate physical devices (vkEnumeratePhysicalDevices), pick a VkPhysicalDevice that has a compute queue, by checking an int storing flags against a bitmask (VkQueueFamilyProperties.queueFlags & VK_QUEUE_COMPUTE_BIT). Also, we must get a logical device (VkDevice), which is the abstraction we use to make requests. <br/><br/>

        We need to transfer objects between host and device memory, so request a VkBuffer abstraction. We also need to request physical allocation of device memory (VkDeviceMemory) for computation. Why does this not happen on logical buffer creation? Short answer: there a range of configuration options for the memory allocation. <br/><br/>

        We need actual software on the GPU that will perform the required calculations, so we load a SPIR-V compiled shader code (VkShaderModule). In addition, we also need to create a VkDescriptorSet and VkDescriptorPool (from which we get VkDescriptorSet). The descriptor sets map to shader input/output resources or uniforms. Vulkan doesn't infer these from a shader. Then, we create the compute pipeline (VkPipeline) given the device, shader and descriptor set layout. <br/><br/>

        We upload data (vkMapMemory & memcpy) to make the data available on the GPU, and then create a command buffer and pool. Commands like binding a pipeline, dispatching compute jobs, copying memory, specified in advance. These commands can be disposable, one use entities. If we have dynamic workloads we might do this one per frame or loop. They are recorded into a VkCommandBuffer allocated from a VkCommandPool. We dispatch command buffers with vkCmdDispatch. To be clear, commands are like orchestration scripts for the actual work; these are not compute operations like the shader code performs. An important clarification: command buffers may contain operations such as copying memory, but this does not include the data upload step with vkMapMemory and memcpy. This is specifically for transferring data across from the host to the GPU, not for intra-GPU transfers. Initially, it might be unclear how functionality is separated between host side and GPU side.<br/><br/>

        Lastly, we submit VkSubmitInfo (containing a reference to our command buffer) to our queue with vkQueueSubmit. To do this, we also require synchronization with a fence; we don't want to try to read before the results are all done. That's it! Most of this is done before run-time. At run-time, we can upload new buffer data, record commands, and submit. In a later post I will apply this to SPH simulation.

      </p>

      <h2>References</h2>
      <ul>
        <li> https://docs.vulkan.org/spec/latest/chapters/fundamentals.html </li>
      </ul>

    </div>
  );
};
